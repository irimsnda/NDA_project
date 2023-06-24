Ext.define('Admin.view.audit_trail.view.grid.PreviousTableDataMISAuditGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'previousTableDataMISAuditGrid',
    controller: 'audit_trialViewCtr',
    title: 'Previous Table Data',
    store: 'previousTableDataMISAuditStr',
    height: 300,
    plugins: [{
                ptype: 'gridexporter'
             }],
    columns: [],

    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'previousTableDataMISAuditStr',
        hidden: true,
        width: '100%',
        beforeLoad: function (btn) {
             var grid=this.up('grid'),
                 panel=grid.up('panel'),
                 valueID=panel.down('hiddenfield[name=id]').getValue(),
                 Store=grid.getStore();
                 Store.removeAll();
            Store.getProxy().extraParams = {
                        id:valueID,
                        type: 'previous'
                }
        }
            
    }],    
    listeners:{
       afterRender:'funct_loadColumns'
        }
    
});