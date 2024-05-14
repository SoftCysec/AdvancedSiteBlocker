# Advanced Site Blocker

## Overview

Advanced Site Blocker is a Google Chrome extension designed to help users manage their time online by blocking access to specified websites during certain hours. Additionally, it monitors user sessions on flagged websites and sends notifications if the user spends too much time on these sites.

## Features

- **Website Blocking**: Blocks access to specified websites during user-defined time periods.
- **Flagged Sites Monitoring**: Monitors user sessions on flagged websites and sends notifications if time spent exceeds a threshold.
- **Custom Schedule**: Allows users to set custom start and end times for blocking.
- **Dynamic Site Management**: Add and manage blocked and flagged sites through an intuitive popup interface.
- **User Notifications**: Notifies users if they spend too much time on flagged sites.

## Future Plans

- **Whitelist Functionality**: Allow users to whitelist certain subdomains or pages.
- **Detailed Reporting**: Provide detailed reports and statistics on time spent on flagged and blocked sites.
- **Enhanced Notifications**: Implement more customizable notification settings, including frequency and content.
- **Cross-Browser Support**: Extend support to other browsers like Firefox, Safari, and Edge.
- **Parental Controls**: Introduce parental control features for better family management.
- **AI Integration**: Utilize AI to recommend productivity improvements based on user behavior.

## Installation

1. Download or clone the project repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click on the extension icon in the toolbar to open the popup.
2. Add websites to the blocked list to prevent access during specified times.
3. Add websites to the flagged list to monitor usage and receive notifications.
4. Set the start and end times for the blocking schedule.
5. Save the settings.

## Files

- `manifest.json`: Extension metadata and permissions.
- `background.js`: Background script managing blocking and session monitoring.
- `content.js`: Injected script displaying blocking overlay.
- `popup.html`: HTML for the extension popup interface.
- `popup.js`: JavaScript handling popup interactions.
- `blocked.html`: Page displayed when a blocked site is accessed.
- `styles.css`: CSS for styling the popup.
- `icon.png`: Icon for the extension.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please open an issue or contact the project maintainers.
