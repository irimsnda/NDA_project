
Ext.define('Admin.view.audit_trail.views.grids.ApplicationAuditReportGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationauditreportGrid',
    controller: 'audit_trialViewCtr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },

    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],

    export_title: 'applicationauditreport',

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                frm = grid.down('auditfilterFrm'),
                search_column = frm.down('combo[name=search_column]').getValue(),
                search_value = frm.down('textfield[name=search_value]').getValue(),
                date_from = frm.down('datefield[name=date_from]').getValue(),
                date_to = frm.down('datefield[name=date_to]').getValue(),
                store = grid.getStore();
            store.removeAll();
            store.getProxy().extraParams = {
                'search_column':search_column,
                'search_value':search_value,
                'date_from':date_from,
                'date_to':date_to

            }
        } 
    }, {
        xtype: 'exportbtn'
    }],

    tbar: [{
        xtype: 'auditfilterFrm'
    }],
    features: [{
        ftype:'grouping',
        startCollapsed: true
    }]
    
});
