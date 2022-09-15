import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { signupApi } from "../../helpers/ApiCalls";

export const Signup = () => {
  const { errors, setErrors } = useDataContext();

  const refName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dngl4djva/image/upload/v1659703451/default_mwdlea.png"
  );
  const navigate = useNavigate();

  const onSignupSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const name = refName?.current?.value;
    const email = refEmail?.current?.value;
    const password = refPassword?.current?.value;
    const avatar = avatarPreview;

    if (!name || !email || !password) {
      console.log("Missing fields...");
      return setErrors("Bitte Username, Email und Password angeben! DANKE!");
    }

    const result = await signupApi({ name, email, password, avatar });
    console.log(result);

    if (result.error) {
      return setErrors(result.error);
    }
    setErrors("");
    navigate("/login");
  };

  //! AVATAR
  const handleAddAvatar: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // console.log(e.target.value);
    if (!e.target.files) {
      return;
    }
    let fileSelected = e.target.files[0];

    if (!fileSelected) return;

    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileSelected);
    fileReader.onloadend = (ev) => {
      setAvatarPreview(fileReader.result as string);
    };
  };

  return (
    <div className="Signup">
      <h2>Signup</h2>
      <form onSubmit={onSignupSubmit}>
        <label htmlFor="avatar-preview">
          <img src={avatarPreview} />
        </label>
        <div>
          <input type="text" ref={refName} placeholder="Name" />
        </div>
        <div>
          <input type="text" ref={refEmail} placeholder="Email" />
        </div>
        <div>
          <input type="text" ref={refPassword} placeholder="Password" />
        </div>
        <button type="submit">Signup</button>
        {/* secret avatar-button image click-handler */}
        <input
          style={{ display: "none" }}
          id="avatar-preview"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleAddAvatar}
        />
      </form>
      <div className="errors">{errors}</div>
    </div>
  );
};
