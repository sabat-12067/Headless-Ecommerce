import React, { useEffect } from 'react';

const Alert = ({ alert, setAlert }) => {

  const { type, show, msg } = alert;

  useEffect(() => {
    const alertTimeOut = setTimeout(() => {
      setAlert({ show: false });
    }, 3500);

    return () => clearTimeout(alertTimeOut);
  }, []);

  return <p className={` text-sm font-meduim tracking-wide py-3 px-4 rounded-sm left-2 w-[95%] mx-auto ${type === 'danger' ? 'text-red bg-light-red border-red border-[1px]' : 'text-green bg-light-green border-[1px] border-green'}`}>{msg}</p>;
};

export default Alert;  
//https://github.com/asuman315/asuman-sounds.git

//  #!/bin/sh

//   git filter-branch --env-filter '

//   OLD_EMAIL=asumanwebdev@.gmail.com
//   CORRECT_NAME=ssendegeya asuman
//   CORRECT_EMAIL=asumanwebdev@gmail.com

//   if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
//   then
//   export GIT_COMMITTER_NAME="$CORRECT_NAME"
//   export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
//   fi
//   if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
//   then
//   export GIT_AUTHOR_NAME="$CORRECT_NAME"
//   export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
//   fi
//   ' --tag-name-filter cat -- --branches --tags