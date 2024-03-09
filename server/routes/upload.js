const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const Project = require("../models/ProjectDocuments");
const path = require('path');
const User = require("../models/UserAcc");
const jwt = require('jsonwebtoken');
const TfIdf = require("natural").TfIdf

const uri = 'mongodb+srv://fayash:admin123@cluster0.striptm.mongodb.net/Project?retryWrites=true&w=majority'; 
let bucket;
const connection = mongoose.createConnection(uri); 

connection.once('open', () => {
  bucket = new mongoose.mongo.GridFSBucket(connection, {
    bucketName: 'Doc_uploads', 
    chunkSizeBytes: 1048576 
  });
});

const storage = new GridFsStorage({
    url : uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: 'Doc_uploads',
              chunkSize : 500000,
              metadata:{
                size : file.size,
                type : file.type,
            },
            };
            resolve(fileInfo);
          });
        });
      }
    });

  
  exports.upload = multer({ storage });
 
  exports.projectupload = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ status: 'error', error: 'No files uploaded' });
      }
  
      console.log("File is selected!!" + req.file);
  
      const uploadedText = req.body.abstract;
  
      
      const plagiarismDetected = await checkPlagiarism(uploadedText);
  
     let abst ;
      if (plagiarismDetected) {
        throw Error("Plagiarism detected in the Project uploaded");
      }

      const { title, description ,abstract, domain, ytlink ,uploadedAt } = req.body;
      const fileName = req.file.filename;
      const user = await User.findOne({ email: req.userEmail });
      if (!user) {
          throw new Error('User not found');
      }
    
      await Project.create({
          title,
          description,
          abstract,
          domain,
          ytlink,
          uploadedAt,
          pdf: fileName,
          createdBy: user.user_name
      });
  
      res.status(200).json({status:'ok', message: "File added successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ status: 'error', message: "Palgirism detected in the Project Uploaded" });
    }
  };
  
  async function checkPlagiarism(uploadedText) {
    const existingAbstracts = await Project.find({}, { abstract: 1, _id: 0 });
  
    for (const existingAbstract of existingAbstracts) {
      const existingText = existingAbstract.abstract;
      const similarity = checkSemanticSimilarity(existingText, uploadedText);
  
      if (similarity) {
        return true;
      }
    }
  
    return false;
  }
  
  function getTerms(tfidf) {
    const terms = [];
    tfidf.listTerms(0).forEach(termInfo => {
        terms.push(termInfo.term);
    });
    return terms;
  }
  function documentHasTerm(tfidf, docIndex, term) {
    
    if (tfidf.documents[docIndex]) {
      const docTerms = Object.keys(tfidf.documents[docIndex]);
  
      return docTerms.includes(term);
    }
  
    return false;
  }
  
  
  function checkSemanticSimilarity(text1, text2, threshold = 0.5) {
    const tfidf1 = new TfIdf();
    const tfidf2 = new TfIdf();
  
    tfidf1.addDocument(text1);
    tfidf2.addDocument(text2);
  
    const combinedVector = combineVectors(tfidf1, tfidf2);
  
    return combinedVector !== null && combinedVector >= threshold;
  }
  
  function combineVectors(tfidf1, tfidf2) {
    const allTerms = new Set([...getTerms(tfidf1), ...getTerms(tfidf2)]);
    const vec1 = getVector(tfidf1, allTerms);
    const vec2 = getVector(tfidf2, allTerms);
  
    if (vec1 === null || vec2 === null) {
      return null; 
    }
  
    return cosineSimilarity(vec1, vec2);
  }
  
  function getVector(tfidf, allTerms) {
    const vector = [];
  
    allTerms.forEach((term) => {
      
      if (documentHasTerm(tfidf, 0, term)) {
        const tfidfValue = tfidf.tfidf(term, 0);
        vector.push(tfidfValue !== undefined ? tfidfValue : 0);
      } else {
       
        vector.push(0);
      }
    });
  
    return vector;
  }
  
  function cosineSimilarity(vec1, vec2) {
    if (vec1.length !== vec2.length) {
      throw new Error('Vector dimensions do not match');
    }
  
    const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((acc, val) => acc + val ** 2, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((acc, val) => acc + val ** 2, 0));
  
    return dotProduct / (magnitude1 * magnitude2);
  }


 exports.getFiles = async (req, res) => {
  try {
   
    let filesMetadata = await bucket.find({}).toArray();
    res.json(filesMetadata);
  } catch (err) {
    res.json({ err: `Error: ${err.message}` });
  }
};



 exports.getFile = async (req, res) => {
  try {
    
    const filename = req.params.filename;
    
    const cursor = bucket.find({ filename });
    const filesMetadata = await cursor.toArray();
    res.json(filesMetadata[0] || null);
  } catch (err) {
    res.json({ err: `Error: ${err.message}` });
  }
};




exports.download =  async (req, res) => {
  try {

    const filename = req.params.filename;
    
    const cursor = bucket.find({ filename });
    const filesMetadata = await cursor.toArray();
    if (!filesMetadata.length) return res.json({ err: 'Not a File!' });
   
    bucket.openDownloadStreamByName(filename).pipe(res);
  } catch (err) {
    res.json({ err: `Error: ${err.message}` });
  }
};


exports.getprojects = async(req,res) => {
  try {
    
    const projects = await Project.find().sort({ uploadedAt : -1});

    res.json({ projects });
  } catch (error) {

    console.error('Error retrieving projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getproject = async(req,res) => {
  try {
    const project = await Project.findOne( {_id:req.params.id});
   
    res.json({ project });
  } catch (error) {

    console.error('Error retrieving project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}

exports.getUserProjects = async(req,res) => {
  try{
    const projects = await Project.find({ createdBy : req.username }).sort({ uploadedAt : -1});

    res.json({ projects });
  } catch(error) {

    console.error('Error retrieving User_projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.deleteProjects = async (req,res) =>{
  const Id = req.params.id;

  try {
      const deletedProject = await Project.findByIdAndDelete(Id);
      res.status(200).json({deletedProject , message: "Project Deleted"} );
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}


exports.getUsers = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userEmail });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
