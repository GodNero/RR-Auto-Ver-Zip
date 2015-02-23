// JavaScript source code

// For now, just to test this file, do the following:
// Copy this file RRUpdate.js to c:\Temp
// Copy OpenEye.json to c:\temp
// Command Line: c:>cscript RRUpdate.js
// Currently the script is only looking for the string "Hunger" and changeing it to "HungerTest"
// If you run the script again it will change it back.

// Create a File System Object
var fso = new ActiveXObject('Scripting.FileSystemObject');

// Setup File paths
var rootPath = "C:\\Temp";
var jsonFile = "OpenEye.json";
var bacFile = jsonFile + ".bac";
var tempFile = "tempFile.json";
var jsonFilePath = rootPath + "\\" + jsonFile;
var bacFilePath = rootPath + "\\" + bacFile;
var tempFilePath = rootPath + "\\" + tempFile;

// Stream Constants - DO NOT EDIT
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;

// Main Program

// Verify the file exists before making changes
if (fso.FileExists(jsonFilePath)) {

    // Copy the original file to a backup file
    fso.CopyFile(jsonFilePath, bacFilePath, true);

    // Copy the original file to a temp file
    fso.CopyFile(jsonFilePath, tempFilePath, true);

    // Open the temp file for reading
    var inFile = fso.OpenTextFile(tempFilePath, ForReading, false);

    // Open the original file for writing
    var outFile = fso.OpenTextFile(jsonFilePath, ForWriting, true);

    // Create a string object for reading each line in the file
    var line = "";

    // Loop through the file
    while (!inFile.AtEndOfStream) {

        // Read each line
        line = inFile.ReadLine();

        // look for the first data block, loop through the file until it's found
        while ((line.search("\"data\":") == -1) && !inFile.AtEndOfStream) {
            outFile.WriteLine(line);
            line = inFile.ReadLine();
        }
        // if data block is not found, then write the last line to the file and break out of the main while loop
        if (inFile.AtEndOfStream) {
            outFile.WriteLine(line);
            break;
        }

        // look for the first tags block after the data block, loop through the file until it's found
        while ((line.search("\"tags\":") == -1) && !inFile.AtEndOfStream) {
            outFile.WriteLine(line);
            line = inFile.ReadLine();
        }
        // if a tags block is not found within the data block, then write the last line to the file and break out of the main while loop
        if (inFile.AtEndOfStream) {
            outFile.WriteLine(line);
            break;
        }

        // look for the first value block after the tags block, loop through the file until it's found
        while ((line.search("\"value\":") == -1) && !inFile.AtEndOfStream) {
            outFile.WriteLine(line);
            line = inFile.ReadLine();
        }
        // if a value block is not found within the tags block, then write the last line to the file and break out of the main while loop
        if (inFile.AtEndOfStream) {
            outFile.WriteLine(line);
            break;
        }

        // edit the value strings
        if(line.search("\"Hunger\"") != -1) {
            line = line.replace("\"Hunger\"", "\"HungerTest\"");
        }
        else {
            line = line.replace("\"HungerTest\"", "\"Hunger\"");
        }

        // write the edited line to the file
        outFile.WriteLine(line)
    }

    // close the files
    inFile.Close();
    outFile.Close();

    // delete the temp file
    fso.DeleteFile(tempFilePath);
}
