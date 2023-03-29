import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom";
import "./Signup.css";
import botImg from "../assets/wall-e.jpg";




const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  //image upload states
  const [image, setImage] = useState(null);
  // const [upladingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "yourOwnKey");
    try {
      // setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/OwnUrlKey/image/upload", {
        method: "post",
        body: data,
      });
      const urlData = await res.json();
      // setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      // setUploadingImg(false);
      console.log(error);
    }
  }

  console.log(username)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) return alert("Please upload your profile picture");
    const picture = await uploadImage(image);
    console.log(picture)

    await signup(username, email, password, picture)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>REGISTER</h3>

      <div className="signup-profile-pic__container">
        <img alt='profilePicture' src={imagePreview || botImg} className="signup-profile-pic" />
        <label htmlFor="image-upload" className="image-upload-label">
          <p className="add-picture-icon">+</p>
        </label>
        <input type="file" id="image-upload" accept="image/png, image/jpeg" onChange={validateImg} style={{ display: "none" }} hidden />
      </div>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      <p className="small">
        <Link to="/login" className="links">
          Already have an account ?
        </Link>
      </p>
    </form>
  )
}

export default Signup
