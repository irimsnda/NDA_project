Ext.define('Admin.view.audit_trail.view.panel.AllTransRecPortalAudit_TrailPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'allTransRecPortalAudit_TrailPnl',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout: 'border',
    controller: 'audit_trialViewCtr',
    
    tbar:['->',{
            xtype: 'label',
            name: 'record_label',
            ui: 'footer',
            html: 'Record ID'
          },
          {
            xtype: 'label',
            name: 'table_label',
            ui: 'footer',
            html: 'Table Name'
          }],

    items: [{
              xtype: 'hiddenfield',
              name: 'id'
             },
             {
              xtype: 'hiddenfield',
              name: 'table_name'
             },
             {
              xtype: 'hiddenfield',
              name: 'record_id'
             },
             {
              xtype: 'portalalltransRecordAuditGrid',
              region: 'center' 
            },
            {
            xtype: 'currentTableDataAuditGrid',
            collapsible: true,
            height: 140,
            region: 'south'
      
        }]
});
