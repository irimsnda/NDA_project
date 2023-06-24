/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.ApplicationPermitsDeclarations', {
    extend: 'Ext.Container',
    xtype: 'applicationpermitsdeclarations',
    controller: 'importexportpermitsvctr',
    layout: 'border',
   
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 20
        },
        
        {
            xtype: 'applicationpermitsdeclarationsdashwrapper',
            region: 'center'
        }
    ]
});

