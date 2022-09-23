import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import CustomForm from "./CustomForm";

const url =
  "https://tech.us11.list-manage.com/subscribe/post?u=e98aa562f251386daa5654a52&amp;id=8bc961e749&amp;f_id=002e9be0f0";

const Subscribe = () => {
  return (
    <div>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <div>
            <>
              <CustomForm
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
              />
            </>
          </div>
        )}
      />
    </div>
  );
};

export default Subscribe;
