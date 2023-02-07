## Lwala exercise

This exercise was done using CHT.

##Tasks done

Created a chw area form called  stock_refill which collects the information of items with low stock and the requested quantity. Stock refill form generates an additional doc called commodity-refill-requested. Did an algo inside task.js to get the latest additional_doc using reported_date which passes the data to the stockout workflow using modifyContent. The data is displayed in stockout workflow as a task, which will be submitted by updating the stock given and submitting the report. I went ahead and added the neccesary validations in the form and the code as requested in the requirements.


##2 How to run this(assuming you have the neccesary CHT setup i.e A runing medic-os instance and cht-conf to run the actions such as uploading forms  and settings)
   a) clone the repo git clone https://github.com/KiharaSimon/lwala-config.git or git clone git@github.com:KiharaSimon/lwala-config.git to a folder

   b) cd or access the clone folder via terminal

   c) run npm install

   d)after installation of packages run cht --url=your_instance_url --accept-self-signed-certs --skip-dependency-check --skip-validate upload-app-forms upload-contact-forms compile-app-settings upload-app-settings upload-custom-translations upload-branding


   e)sync the info in the instance and trying filling stock-refill-request form which will auto generate stock request task on the supervisor level.


## 
