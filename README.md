# TLCH Secure Browser

TLCH Secure Browser is designed to provide a high level of privacy and security. It ensures that no browsing history or personal data is saved, making your online activities private. Additionally, it supports `.tlch` top-level domains, offering enhanced functionality for users on the TLCH network.

## How to Compile and Build TLCH Secure Browser

To compile and build TLCH Secure Browser yourself, follow these steps:

1. **Prepare Your Project:**
   - Ensure your Electron project is correctly set up and all code is ready for packaging.

2. **Delete Existing Distribution Directory (if any):**
   - Open your terminal and navigate to the root directory of your project.
   - Run the following command to remove the `/dist` directory if it exists:

     ```bash
     rm -rf dist
     ```

3. **Open Terminal:**
   - Make sure you are in the root directory of your Electron project.

4. **Check if `electron-builder` is Installed:**
   - Ensure `electron-builder` is installed. If it’s not, install it with:

     ```bash
     npm install electron-builder --save-dev
     ```

   - You can verify the installation with:

     ```bash
     npx electron-builder --version
     ```

5. **Run `electron-builder` to Build the Package:**
   - Execute the following command to build your application:

     ```bash
     npx electron-builder
     ```

   - This will create the package in the `dist` directory.

6. **Verify the Build:**
   - Check the `dist` directory for the generated package files. Your packaged TLCH Secure Browser should be ready for distribution.

By following these steps, you can successfully compile and build TLCH Secure Browser, ensuring it is ready for use and distribution.
