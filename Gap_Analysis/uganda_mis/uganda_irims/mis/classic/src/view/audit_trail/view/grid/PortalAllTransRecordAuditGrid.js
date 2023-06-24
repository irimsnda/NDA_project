Ext.define('Admin.view.audit_trail.view.grid.PortalAllTransRecordAuditGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'portalalltransRecordAuditGrid',
    controller: 'audit_trialViewCtr',
    title: 'All Record Transaction Audit',
    store: 'alltransRecordAuditStr',
    height: 300,
    plugins: [{
                ptype: 'gridexporter'
             }],
    columns: [],

    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'alltransRecordAuditStr',
        hidden: true,
        width: '100%',
        beforeLoad: function (btn) {
             var grid=this.up('grid'),
                 panel=grid.up('panel'),
                 table_name=panel.down('hiddenfield[name=table_name]').getValue(),
                 record_id=panel.down('hiddenfield[name=record_id]').getValue(),
                 Store=grid.getStore();
                 Store.removeAll();
            Store.getProxy().extraParams = {
                        record_id:record_id,
                        table_name:table_name,
                        type: 'portal'
                }
        }
            
    },'->',{
        xtype: 'exportbtn',
        text: 'Export Above'
       
    }],    
    listeners:{
       afterRender:'funct_loadColumns'
        }
    
});