export const API_URL = "http://localhost:8080";
export const API_VERSION = "api/v1";
export const TOKEN = "token";
export const AUTHENTICATED_USER = "authenticatedUser";
export const TOKEN_EXPIRED = "tokenExpired";
export const RETURN_URL = "returnUrl";
export const TEST_USERNAME = "AvHGfC2k2RtpCpA2Qc115crNDpuf2P";

export const START_DATE_PATTERN = "yyyy-MM-dd";
export const POSTED_ON_PATTERN = "yyyy-MM-ddTHH:mm:ss";

export const USER_CREATED_MSG =
  "User was created. On email activated email was sent. Please follow description in email message";
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const GREEN_COMPLETION_STYLES = {
  0:"linear-gradient(to right, white 0% 100%)",
  25:"linear-gradient(to right, #4fb46c 0% 25%, white 25% 100%)",
  50:"linear-gradient(to right, #4fb46c 0% 50%, white 50% 100%)",
  75:"linear-gradient(to right, #4fb46c 0% 75%, white 75% 100%)",
  100:"linear-gradient(to right, #4fb46c 0% 100%)"
};

export const YELLOW_COMPLETION_STYLES = {
  0:"linear-gradient(to right, white 0% 100%)",
  25:"linear-gradient(to right, #fbcc56 0% 25%, white 25% 100%)",
  50:"linear-gradient(to right, #fbcc56 0% 50%, white 50% 100%)",
  75:"linear-gradient(to right, #fbcc56 0% 75%, white 75% 100%)",
  100:"linear-gradient(to right, #fbcc56 0% 100%)"
};

export const BLUE_COMPLETION_STYLES = {
  0:"linear-gradient(to right, white 0% 100%)",
  25:"linear-gradient(to right, #67abcc 0% 25%, white 25% 100%)",
  50:"linear-gradient(to right, #67abcc 0% 50%, white 50% 100%)",
  75:"linear-gradient(to right, #67abcc 0% 75%, white 75% 100%)",
  100:"linear-gradient(to right, #67abcc 0% 100%)"
};

// export const MADE_CODES = {
//   "0": "0",
//   "1": "25",
//   "2": "50",
//   "3": "75",
//   "4": "100"
// };

export const MADE_CODES = {
  100: 0,
  75: 1,
  50: 2,
  25: 3,
  0: 4
};


export const GREEN_COLORS = [
  "#61bc7b",
  "#80c995",
  "#a0d6af",
  "#bfe4ca",
  "#dff1e4"
];

export const YELLOW_COLORS = [
  "#fbcc56",
  "#fbd677",
  "#fce099",
  "#fdeabb",
  "#fef4dd"
];

export const BLUE_COLORS = [
  "#63a0dd",
  "#82b3e3",
  "#a1c6ea",
  "#c0d9f1",
  "#dfecf8"
];

export const TITLE_LENGTH_VALIDATOR = "The title field max length is 40 characters";
export const TITLE_REQUIRED_VALIDATOR = "The title field is required";
export const BODY_LENGTH_VALIDATOR = "The body field max length is 255 characters";
export const BODY_REQUIRED_VALIDATOR = "The body field is required";

export const USERNAME_LENGTH_VALIDATOR = "The username field should be between 6 and 50 characters";
export const USERNAME_REQUIRED_VALIDATOR = "The username field is required";
export const USERNAME_DUPLICATED_VALIDATOR = "Username already exists";

export const PASSWORD_LENGTH_VALIDATOR = "The password field should be between 6 and 60 characters";
export const PASSWORD_REQUIRED_VALIDATOR = "The password field is required";

export const EMAIL_REQUIRED_VALIDATOR = "The email field is required";
export const EMAIL_INVALID_VALIDATOR = "This is not a valid email address";

export const FIRSTNAME_REQUIRED_VALIDATOR = "The first name field is required";
export const LASTNAME_REQUIRED_VALIDATOR = "The last name field is required";

export const DETAIL_DATE_FORMAT = "yyyy-MM-ddTHH:mm:ss";
export const DATE_FORMAT = "yyyy-MM-dd";