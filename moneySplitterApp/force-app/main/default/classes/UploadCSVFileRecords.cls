public with sharing class UploadCSVFileRecords {
    @AuraEnabled
    public static list<Account> csvFileRead(Id contentDocumentId){
        list<Account> accountInsertList = new list<Account>();
        if(contentDocumentId != null) {
            
            // Fetch File Data based on the basic of document id 
            ContentVersion contentVersionObj = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:contentDocumentId WITH SECURITY_ENFORCED];
            // split the file data
            list<String> csvRecordsList = contentVersionObj.VersionData.toString().split('\n');

            for(Integer i = 1; i < csvRecordsList.size(); i++){
                Account accountObj = new Account();
                list<String> csvRowData = csvRecordsList[i].split(',');
                //System.debug('csvRowData====> '+csvRowData);
                accountObj.Name = csvRowData[0]; // accName
                accountObj.AccountNumber = csvRowData[1];
                accountObj.Rating = csvRowData[2];
                accountObj.Type = csvRowData[3];
                // accountObj.NumberOfEmployees = Integer.ValueOf( csvRowData[4]);
                accountInsertList.add(accountObj);
            }
            System.debug('Heap size = '+Limits.getHeapSize());
            System.debug('Heap size = '+Limits.getLimitHeapSize());

            try{    
                if(!accountInsertList.isEmpty() && Limits.getHeapSize() < 6000000) {
                    insert accountInsertList;
                }
            }
            catch (Exception ex) {
                throw new AuraHandledException(ex.getMessage());
            } 
        }
        return accountInsertList;
    }
}