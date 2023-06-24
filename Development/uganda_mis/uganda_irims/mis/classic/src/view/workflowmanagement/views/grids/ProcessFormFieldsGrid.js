/**
 * Created by Kip on 11/25/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.ProcessFormFieldsGrid', {
    extend: 'Admin.view.administration.views.grids.FormFieldsGrid',
    xtype: 'processformfieldsgrid',
    //height: Ext.Element.getViewportHeight() - 196,
    title: 'Form Parts',
    //frame: true,
    width: '',
    header: true,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
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
                fn: 'setWorkflowCombosStore',
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
            },
            afterrender: function(){
                var grid=this.up('grid'),
                    store = this.getStore(),
                    panel = grid.up('processformconfigpnl'),
                    module_id = panel.down('hiddenfield[name=module_id]').getValue();
                store.removeAll();
                store.load({params:{module_id:module_id}});
            }
        },
        labelStyle: "font-weight:bold",
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true//clear with ESC key
            }
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'processformfieldsstr',
                proxy: {
                    url: 'workflow/getProcessEditableFormFields'
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.isEditable) {
                        sm.select(rowIndex, true);
                    }
                });
            });
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        doRefresh: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                form_id = grid.down('combo[name=form_id_cmb]').getValue();
            if (!form_id) {
                toastr.warning('No form selected!!', 'Warning Response');
                return false;
            } else {
                store.removeAll();
                store.load();
            }
        },
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                panel = grid.up('processformconfigpnl'),
                process_id = panel.down('hiddenfield[name=process_id]').getValue(),
                form_id = grid.down('combo[name=form_id_cmb]').getValue();
                    //panel.down('hiddenfield[name=form_id]').getValue();
            store.getProxy().extraParams = {
                process_id: process_id,
                form_id: form_id
            };
        }
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'field_name',
        text: 'Field Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'field_type',
        text: 'Field Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }
    ]
});