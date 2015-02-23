#
# RRDevUpdate.ps1
#

# For now, just to test this file, do the following:
# Copy this file RRUpdate.ps1 to c:\Temp
# Copy OpenEye.json to c:\temp
# Command Line: C:\Temp>PowerShell -ExecutionPolicy RemoteSigned -File RRUpdate.ps1
# Currently the script is only looking for the string "Hunger" and changeing it to "HungerTest"
# If you run the script again it will change it back.

# Setup File paths
$rootPath = "C:\Temp"
$jsonFile = "OpenEye.json"
$bacFile = $jsonFile + ".bac"
$jsonFilePath = Join-Path -Path $rootPath -ChildPath $jsonFile
$bacFilePath = Join-Path -Path $rootPath -ChildPath $bacFile

# Main Program

# Verify the file exists before making changes
if (Test-Path $jsonFilePath) {

    # Copy the original file to a backup file
    Copy-Item -Path $jsonFilePath -Destination $bacFilePath

    # Open the original file for editing
    $File = Get-Content $jsonFilePath

    # Search the file for the item you want to edit
    If ($File -match "HungerTest")
    {
        # Edit the item
        $File = $File -Replace "HungerTest", "Hunger"
    }
    ElseIf ($File -match "Hunger")
    {
        # Edit the item
        $File = $File -Replace "Hunger", "HungerTest"
    }
    
    # Write the changes to the file
    Out-File -FilePath $jsonFilePath -InputObject $File -Encoding ascii
}
