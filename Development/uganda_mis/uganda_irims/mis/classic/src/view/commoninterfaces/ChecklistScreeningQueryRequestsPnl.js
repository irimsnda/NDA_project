Ext.define('Admin.view.commoninterfaces.ChecklistScreeningQueryRequestsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'checklistscreeningqueryrequestspnl',
    layout: {
        type: 'fit'
    },
    defaults: {
        split: true
    },
    items:[{
        xtype: 'productscreeninggrid',
        title: 'Checklist',
    },{
        xtype: 'applicationqueriesgrid',
        title: 'Request for Additional Information(Query)',
    }]
    
});