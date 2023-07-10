# CloseAi - Imaginary Image Generator 🚀

Create captivating imaginary images effortlessly, no login required!

CloseAi is a web application that leverages the power of OpenAI API to generate imaginary images. With CloseAi, you can create unique and captivating images that don't exist in reality. This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, providing a seamless and efficient user experience.

## Features

- Generate stunning imaginary images using OpenAI API.
- Customize various parameters to influence the image generation process.
- User-friendly interface for a smooth and intuitive user experience.
- Save and download generated images for later use.
- Responsive design, ensuring a seamless experience across different devices.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Image Storage:** Cloudinary

## Folder Structure

```
root
│
├── backend
│   ├── authentication
│   ├── middlewares
│   ├── mongodb
│   ├── routes
│   └── ...
│
└── frontend
    ├── public
    ├── src
    └── ...
```

## Prerequisites

Before running the application, ensure you have the following dependencies installed:

- Node.js
- MongoDB
- Cloudinary account (for image storage)
- OpenAI API key

## Installation

Follow these steps to set up and run CloseAi:

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/hrithikvishwakarma001/CloseAI-Imaginary-Image-AI-generator
```

2. Navigate to the backend directory:

```bash
cd CloseAI-Imaginary-Image-AI-generator/backend
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

```plaintext
MONGODB_URL=<your_mongodb_url>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
OPENAI_API_KEY=<your_openai_api_key>
GOOGLE_CLIENT_ID=<your_google_console_client_api_key>
GOOGLE_CLIENT_SECRET=<your_google_console_client_secrete_key>
```

5. Start the backend server:

```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` directory and add the following environment variable:

```plaintext
REACT_APP_BACKEND_API=<your_backend_api>
```

4. Start the frontend server:

```bash
npm start
```

5. Open your web browser and visit `http://localhost:3000` to access the CloseAi web application.

# Screenshots

### Community
> ![image](https://github.com/hrithikvishwakarma001/CloseAI-Imaginary-Image-AI-generator/assets/104666876/3557eb0f-ddf9-46b1-a508-021736a8e785)


### Create post page 
> ![image](https://github.com/hrithikvishwakarma001/CloseAI-Imaginary-Image-AI-generator/assets/104666876/bb02ce39-f8e0-49db-8be0-4d5cb6116fef)


### Community - Dark mode
> ![image](https://github.com/hrithikvishwakarma001/CloseAI-Imaginary-Image-AI-generator/assets/104666876/7b3a0df7-320a-4fa7-b2c4-8e5bdcf35fdf)



### Create post page - Dark mode
> ![image](https://github.com/hrithikvishwakarma001/CloseAI-Imaginary-Image-AI-generator/assets/104666876/b749b1d2-0389-4287-ade8-ad3d95f5a5c2)


## Usage

1. Visit the CloseAi web application on `http://localhost:3000`.
2. Customize the image generation parameters.
3. Click on the "Generate" button to create a new imaginary image.
4. Save or download the generated image as desired.

## Acknowledgements

- [OpenAI](https://openai.com) - For providing the powerful API to generate imaginary images.
- [Cloudinary](https://cloudinary.com) - For image storage and management.

## Need Help?

If you have any issues or questions regarding CloseAi, please feel free to [open an issue](https://github.com/hrithikvishwakarma001/CloseAI-Imaginary-Image-AI-generator/issues) on the GitHub repository.

## Contributing

Currently, we are not accepting contributions for this project.
