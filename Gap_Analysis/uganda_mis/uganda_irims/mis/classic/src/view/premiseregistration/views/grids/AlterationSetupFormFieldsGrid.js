/**
 * Created by Kip on 12/8/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.AlterationSetupFormFieldsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'alterationsetupformfieldsgrid',
    header: true,
    tbar: [{
        xtype: 'hiddenfield',
        name: 'form_id'
    },{
        xtype: 'combo',
        fieldLabel: 'Form',
        forceSelection: true,
        name: 'form_id_cmb',
        width: 400,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'form_id',
        margin: 2,
        labelWidth: 70,
        listeners: {
            beforerender: {
                fn: 'setPremiseRegCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getApplicationAlterationForms'
                    }
                },
                isLoad: false
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                    grid_store = grid.getStore();
                grid.down('hiddenfield[name=form_id]').setValue(newVal);
                grid_store.load();
            }
        },
        labelStyle: "font-weight:bold"
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    bbar: [
        {
            xtype: 'pagingtoolbar',
            //width: '100%',
            displayInfo: false,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                this.up('grid').fireEvent('refresh',this);
            }
        },
        '->',
        {
            xtype: 'button',
            text: 'Sync Changes',
            ui: 'soft-purple',
            name: 'effect_changes',
            iconCls: 'x-fa fa-save',
            disabled: true
        }
    ],
    listeners:{
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 100,
                storeId: 'applicationstatusesstr',
                proxy: {
                    url: 'workflow/getApplicationAlterationFormFields'
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
    features:[
        {
            ftype: 'searching',
            mode: 'local',
            minChars: 2
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'field_name',
        text: 'Field Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }]
});