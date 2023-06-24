/**
 * Created by Kip on 12/14/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.ProcessOtherPartsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'processotherpartsgrid',
    autoScroll: true,
    autoHeight: true,
    title: 'Other Parts',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    export_title: 'Alteration setup',
    bbar: [
        {
            xtype: 'pagingtoolbar',
            //width: '100%',
            displayInfo: false,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            doRefresh: function () {
                var store = this.getStore();
                store.removeAll();
                store.load();
            },
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    module_id = grid.up('processformconfigpnl').down('hiddenfield[name=module_id]').getValue(),
                    process_id = grid.up('processformconfigpnl').down('hiddenfield[name=process_id]').getValue();
                store.getProxy().extraParams = {
                    module_id: module_id,
                    process_id: process_id
                };
            }
        }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'workflow/getProcessEditableOtherParts'
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                store1 = grid.getStore(),
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.isEditable) {
                        sm.select(rowIndex, true);
                    }
                });
            });
            store1.removeAll();
            store1.load();
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Part',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }]
});
