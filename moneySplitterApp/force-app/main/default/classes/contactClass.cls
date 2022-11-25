public class contactClass {
    
    @AuraEnabled(Cacheable = true)
    public static list<Contact> getAccountData(String textkey) {
        textkey = '%' + textkey + '%';
        list<Contact> accLst = [SELECT  Id, Name, Phone From Contact WHERE Name LIKE :textkey];
        
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
    
}