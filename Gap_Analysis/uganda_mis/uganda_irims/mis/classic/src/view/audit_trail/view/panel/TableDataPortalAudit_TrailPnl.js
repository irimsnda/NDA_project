Ext.define('Admin.view.audit_trail.view.panel.TableDataPortalAudit_TrailPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'tableDataPortalAudit_TrailPnl',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout: 'border',
    controller: 'audit_trialViewCtr',
    
    tbar:['->',{
            xtype: 'label',
            name: 'table_label',
            ui: 'footer',
            html: 'Table Name'
          },{
            xtype: 'label',
            name: 'record_label',
            ui: 'footer',
            html: 'Record ID'
          },{
            xtype: 'label',
            name: 'action_label',
            ui: 'footer',
            html: 'action_label'
          },{
            xtype: 'label',
            name: 'actionby_label',
            ui: 'footer',
            html: 'actionby_label'
          }
         ],

    items: [{
        xtype: 'panel',
        region: 'center',
        layout: 'column',
        defaults: {
           columnWidth: 0.48,
           style: 'margin-left:10px'
           },
        items: [
               {
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
                xtype: 'previousTableDataPortalAuditGrid'
              },
              {
                xtype: 'updatedTableDataPortalAuditGrid'
                }],
       },{
            xtype: 'currentTableDataAuditGrid',
            collapsible: true,
            height: 140,
            region: 'south'
        }
        ],
        bbar:[{
            xtype: 'toolbar',
            width: '100%',
            ui: 'footer',
            items: ['->',{
                xtype: 'button',
                name: 'revert',
                type: 'portal',
                text: 'Revert To Previous Records',
                handler: 'func_revertToPreviousTableData'
            }],
        }]
});
