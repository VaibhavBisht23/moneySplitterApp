public with sharing class lookupController {

    @AuraEnabled
   public static List<Account> findRecords( String searchValue){
       String key = '%' + searchValue + '%';
       String Query = 'Select Id,Name FROM Account Where Name LIKE : key ';
       List<Account> sobjectList = Database.query(Query);
       return sobjectList;
   }
}
