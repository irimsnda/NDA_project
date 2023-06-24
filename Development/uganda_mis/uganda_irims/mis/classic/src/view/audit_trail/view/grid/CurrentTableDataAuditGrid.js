Ext.define('Admin.view.audit_trail.view.grid.CurrentTableDataAuditGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'currentTableDataAuditGrid',
    controller: 'audit_trialViewCtr',
    store: 'currentTableDataAuditStr',
    title: 'Current Table Data',
    height: 300,
   
    plugins: [{
                ptype: 'gridexporter'
             }],
    columns: [],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'currentTableDataAuditStr',
        hidden: true,
        width: '100%',
        beforeLoad: function (btn) {
             var grid=this.up('grid'),
                 panel=grid.up('panel'),
                 table_name=panel.down('hiddenfield[name=table_name]').getValue(),
                 ID=panel.down('hiddenfield[name=record_id]').getValue(),
                 Store=grid.getStore();
                 var filter = JSON.stringify({'id':ID});
                 Store.removeAll();
            Store.getProxy().extraParams = {
                        table_name: table_name,
                        filters:filter
                }
        }
    }],    
    listeners:{
       afterRender:'funct_loadColumns'
        }
       
    
    
});