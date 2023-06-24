/**
 * Created by Kip on 12/7/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.AlterationSetupParamsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'alterationsetupparamsgrid',
    autoScroll: true,
    autoHeight: true,
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
            beforeLoad: function () {
                this.up('grid').fireEvent('refresh', this);
            }
        },
        '->',
        {
            xtype: 'button',
            text: 'Sync Changes',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            name: 'effect_changes',
            disabled: true
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
                    url: 'workflow/getApplicationAlterationOtherParams'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.is_editable) {
                        sm.select(rowIndex, true);
                    }
                });
            });
        },
        beforedeselect: function (sel, record) {
            var is_editable = record.get('is_editable');
            if (is_editable) {
                return false;
            }
        },
        select: function (sel) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=effect_changes]').setDisabled(false);
            }
        },
        deselect: function (sel) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=effect_changes]').setDisabled(true);
            }
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
