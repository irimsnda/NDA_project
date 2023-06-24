Ext.define('Admin.view.audit_trail.view.grid.UpdatedTableDataMISAuditGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'updatedTableDataMISAuditGrid',
    controller: 'audit_trialViewCtr',
    store: 'updatedTableDataMISAuditStr',
    title: 'Updated Table Data',
    width: '100%',
    height: 300,
    
    plugins: [{
                ptype: 'gridexporter'
             }],
    columns: [],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'updatedTableDataMISAuditStr',
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