/**
 * Created by Softclans on 11/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.grids.AllChecklistsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ChecklistResponsesCmnGrid',
    xtype: 'allchecklistsgrid',
    controller: 'premiseregistrationvctr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 500,
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
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly',
        value: 1
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'combo',
        fieldLabel: 'Checklist Category',
        labelWidth: 150,
        width: 400,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'category_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'ChecklistCategory'
                        }
                    }
                },
                isLoad: true
            },
            change: function () {
                var store = this.up('grid').getStore();
                store.load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }],
    listeners: {
        afterrender: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                application_id = grid.down('hiddenfield[name=application_id]').getValue(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                checklist_category = grid.down('combo[name=category_id]').getValue(),
                process_id = grid.down('hiddenfield[name=process_id]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code,
                checklist_category_id: checklist_category,
                process_id: process_id
            };
        }
    }]
});
