Ext.define('Admin.view.audit_trail.view.grid.MISAllTransRecordAuditGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'misalltransRecordAuditGrid',
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
                 record_id=panel.down('hiddenfield[name=record_id]').getValue(),
                 table_name=panel.down('hiddenfield[name=table_name]').getValue(),
                 Store=grid.getStore();
                 Store.removeAll();
            Store.getProxy().extraParams = {
                        record_id:record_id,
                        table_name:table_name,
                        type: 'mis'
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