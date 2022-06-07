import * as yup from "yup";

// export const loginSchema = yup.object().shape({
//   email: yup
//     .string()
//     .required('Please enter your Email')
//     .email('Please enter a valid Email'),

//   password: yup.string().required('Please enter your Password'),
// });

export const signupSchema = yup.object().shape({
  // name: yup
  //   .string()
  //   .required('Please enter your Name')
  //   .min(3, 'Name shoud be atleast 3 characters long')
  //   .max(15, 'Name cannot be more than 15 characters'),
  email: yup
    .string()
    .required("Please enter your Email")
    .email("Please enter a valid Email"),
  password: yup
    .string()
    .required("Please enter your Password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmpassword: yup
    .string()
    .required("Please re-enter your Password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

// export const forgotPasswordSchema = yup.object().shape({
//   email: yup
//     .string()
//     .required('Please enter your Email')
//     .email('Please enter a valid Email'),
// });

// export const groupSchema = yup.object().shape({
//   groupName: yup.string().required('Please enter your Group Name'),
// });

// export const addNewActivitySchema = yup.object().shape({
//   ActivityValue: yup.number().required('Please enter your Activity Name'),
// });

// export const changePasswordSchema = yup.object().shape({
//   ChangePassword: yup.string().required('Please enter your Current Password'),
//   NewPassword: yup
//     .string()
//     .required('Please enter your New Password')
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
//     ),
//   ReEnterNewPassword: yup
//     .string()
//     .required('Please re-enter your New Password')
//     .oneOf([yup.ref('NewPassword'), null], 'Passwords must match'),
// });
