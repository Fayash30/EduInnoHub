
# EduInnoHub

## Project Title: Student Project Collaboration Platform

### Description

EduInnoHub is an innovative web application designed to enable students from various institutions to showcase and collaborate on their projects. The platform fosters creativity and teamwork by facilitating connections among students working on similar or complementary ideas. To maintain the integrity and originality of the projects, EduInnoHub features a robust plagiarism detection system using Term Frequency-Inverse Document Frequency (TF-IDF).

### Key Features

- **User Authentication and Profile Management**: Secure user authentication with comprehensive profile management.
- **Project Showcasing**: Students can upload and display their projects with detailed descriptions and media files.
- **Advanced Search Functionality**: Implemented using TF-IDF for enhanced relevance and plagiarism detection.
- **Global Chat**: A real-time chat feature allowing users to communicate, ask questions, and resolve doubts collaboratively.
- **Admin Dashboard**: A dedicated dashboard for administrators to manage users and projects effectively.

### Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Plagiarism Detection**: TF-IDF

### Project Structure

```
EduInnoHub/
├── client/                  # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       ├── index.js
│       └── ... 
├── server/                  # Backend Node.js application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── ...
├── .gitignore
├── README.md
└── ...
```

### Usage

1. **User Registration and Login**: Users can register and log in to their accounts to access the platform's features.
2. **Project Uploading**: Students can upload projects, complete with descriptions and media. The system checks for plagiarism to ensure the originality of the submissions.
3. **Collaboration**: Users can connect with others to collaborate and share knowledge.
4. **Global Chat**: A feature for real-time communication, enabling students to discuss and resolve doubts together.
5. **Admin Dashboard**: Admins have access to a dashboard for managing the platform's users and projects.

### Vision

EduInnoHub aims to create a collaborative learning environment that drives innovation and teamwork among students from diverse educational backgrounds. By providing a platform for project sharing and interaction, it helps students gain insights, feedback, and potential partnerships, ultimately enhancing their learning experience.

### Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

### Acknowledgements

- Thanks to all the contributors and the open-source community for their support and collaboration.
