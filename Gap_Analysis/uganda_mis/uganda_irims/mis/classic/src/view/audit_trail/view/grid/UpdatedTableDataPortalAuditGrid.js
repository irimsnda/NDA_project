Ext.define('Admin.view.audit_trail.view.grid.UpdatedTableDataPortalAuditGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'updatedTableDataPortalAuditGrid',
    controller: 'audit_trialViewCtr',
    store: 'updatedTableDataPortalAuditStr',
    title: 'Updated Table Data',
    height: 300,
    width: '100%',
    
    
    plugins: [{
                ptype: 'gridexporter'
             }],
    columns: [],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'updatedTableDataPortalAuditStr',
        hidden: true,
        width: '100%',
        beforeLoad: function (btn) {
             var grid=this.up('grid'),
                 panel=grid.up('panel'),
                 valueID=panel.down('hiddenfield[name=id]').getValue(),
                 Store=grid.getStore();
                 Store.removeAll();
                 Store.getProxy().extraParams = {
                        type: 'updated',
                        id:valueID
                }
        }
    }],    
    listeners:{
       afterRender:'funct_loadColumns'
        }
       
    
    
});