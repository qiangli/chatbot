import React, { type JSX, Fragment, isValidElement } from 'react';

import { useSettings, useStyles } from 'react-chatbotify';

const Header = ({ buttons }: { buttons: JSX.Element[] }) => {
  const { settings } = useSettings();
  const { styles } = useStyles();

  const headerStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${settings.general?.secondaryColor},
			${settings.general?.primaryColor})`,
    ...styles.headerStyle,
  };

  return (
    <div style={headerStyle} className="rcb-chat-header-container">
      <a href="https://github.com/qiangli/chatbot" target="_blank">
        <div className="rcb-chat-header">
          {settings.header?.showAvatar && (
            <div
              style={{ backgroundImage: `url("${settings.header?.avatar}")` }}
              className="rcb-bot-avatar"
            />
          )}
          {isValidElement(settings.header?.title) ? (
            settings.header?.title
          ) : (
            <div
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {settings.header?.title}
            </div>
          )}
        </div>
      </a>
      <div className="rcb-chat-header">
        {buttons?.map((button: JSX.Element, index: number) => (
          <Fragment key={index}>{button}</Fragment>
        ))}
      </div>
    </div>
  );
};

export default Header;
