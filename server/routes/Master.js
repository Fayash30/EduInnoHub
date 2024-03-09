const Domain = require('../models/Domain');
const College = require('../models/College');
const Course = require('../models/Course');



// -----------------Routes For Domains------------------------------------------

exports.getdomains = async(req,res) => {
    try {
      
      const domains = await Domain.find().sort({ domain : 1 });
  
      res.json({ domains });
    } catch (error) {
  
      console.error('Error retrieving Domains:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  exports.postdomains = async (req, res) => {
    try {
        const { domain } = req.body;

        if (!domain) {
            return res.status(400).json({ error: 'Domain field is required' });
        }

        const newDomain = new Domain({
            domain: domain
        });

        await newDomain.save();
        
        res.send({ status: 'ok' });
        console.log('Domain posted successfully');
    } catch (error) {
        console.error('Error Posting Domains:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updatedomain = async (req, res) => {
  const { id } = req.params;
  const { domain } = req.body;

  try {
      const updatedDomain = await Domain.findByIdAndUpdate(id, { domain }, { new: true });

      if (!updatedDomain) {
          return res.status(404).json({ error: 'Domain not found' });
      }

      res.json(updatedDomain);
  } catch (error) {
      console.error('Error updating domain:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deletedomain = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedDomain = await Domain.findByIdAndDelete(id);

      if (!deletedDomain) {
          return res.status(404).json({ error: 'Domain not found' });
      }

      res.json({ message: 'Domain deleted successfully' });
  } catch (error) {
      console.error('Error deleting domain:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


// ---------------------------Routes For Colleges --------------------------------------------

exports.getcolleges = async(req,res) => {
  try {
    
    const colleges = await College.find().sort({ college : 1 });

    res.json({ colleges });
  } catch (error) {

    console.error('Error retrieving Colleges:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.postcolleges = async (req, res) => {
  try {
      const { college } = req.body;

      if (!college) {
          return res.status(400).json({ error: 'college field is required' });
      }

      const newCollege = new College({
          college: college
      });

      await newCollege.save();
      
      res.send({ status: 'ok' });
      console.log('College posted successfully');
  } catch (error) {
      console.error('Error Posting College:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updatecollege = async (req, res) => {
  const { id } = req.params;
  const { college } = req.body;

  try {
      const updatedcollege = await College.findByIdAndUpdate(id, { college }, { new: true });

      if (!updatedcollege) {
          return res.status(404).json({ error: 'college not found' });
      }

      res.json(updatedcollege);
  } catch (error) {
      console.error('Error updating college:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deletecollege = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedcollege = await College.findByIdAndDelete(id);

      if (!deletedcollege) {
          return res.status(404).json({ error: 'college not found' });
      }

      res.json({ message: 'college deleted successfully' });
  } catch (error) {
      console.error('Error deleting college:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

/////----------------------------------Routes for Courses------------------------------------------------------

exports.getcourses = async(req,res) => {
  try {
    
    const courses = await Course.find().sort({ course : 1 });

    res.json({ courses });
  } catch (error) {

    console.error('Error retrieving courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.postcourses = async (req, res) => {
  try {
      const { course } = req.body;

      if (!course) {
          return res.status(400).json({ error: 'Course field is required' });
      }

      const newCourse = new Course({
          course: course
      });

      await newCourse.save();
      
      res.send({ status: 'ok' });
      console.log('Course posted successfully');
  } catch (error) {
      console.error('Error Posting Courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updatecourse = async (req, res) => {
  const { id } = req.params;
  const { course } = req.body;

  try {
      const updatedcourse = await Course.findByIdAndUpdate(id, { course }, { new: true });

      if (!updatedcourse) {
          return res.status(404).json({ error: 'course not found' });
      }

      res.json(updatedcourse);
  } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deletecourse = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedcourse = await Course.findByIdAndDelete(id);

      if (!deletedcourse) {
          return res.status(404).json({ error: 'course not found' });
      }

      res.json({ message: 'course deleted successfully' });
  } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};