# Use Node v4 as the base image.
FROM node:4

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /asset

# Install dependencies
RUN cd /asset; \
    npm install --production

# Expose our server port.
# EXPOSE 8123

# Run our app.
CMD ["node", "/asset/index.js"]