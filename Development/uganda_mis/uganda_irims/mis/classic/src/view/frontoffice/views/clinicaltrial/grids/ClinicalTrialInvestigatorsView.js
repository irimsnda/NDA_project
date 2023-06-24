 Ext.define('Admin.view.frontoffice.clinicaltrial.grids.ClinicalTrialInvestigatorsView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   titleCollapse: true,
   width: '100%',
   collapsible: true,
    xtype: 'clinicaltrialinvestigatorsview',
    layout:'fit',
    store: 'clinicaltrialinvestigatorsstr',
    title: 'Investigators information',
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'site',
        name: 'site',
        text: 'Study Site',
        width: 150,
        tbCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'category',
        name: 'category',
        text: 'Investigator Category',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'investigator',
        name: 'investigator',
        text: 'Investigator',
        width: 150,
        tbCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        name: 'postal_address',
        text: 'Postal Address',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        name: 'physical_address',
        text: 'Physical Address',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'telephone',
        name: 'telephone',
        text: 'Telephone',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country',
        name: 'country',
        text: 'Country',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region',
        name: 'region',
        text: 'Region',
        width: 150,
        tbCls: 'wrap'
    }]


  });