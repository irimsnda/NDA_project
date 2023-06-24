/**
 * Created by Kip on 12/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.AlterationCompareFormFieldsGrid', {
    extend: 'Admin.view.premiseregistration.views.grids.AlterationSetupFormFieldsGrid',
    xtype: 'alterationcompareformfieldsgrid',
    width: '',
    tbar: [{
        xtype: 'hiddenfield',
        name: 'form_id'
    }, {
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
            },
            afterrender: function () {
                var store = this.store,
                    grid = this.up('grid'),
                    panel = grid.up('premisealterationcomparedetails'),
                    module_id = panel.down('hiddenfield[name=module_id]').getValue();
                store.removeAll();
                store.load({params: {module_id: module_id}});
            }
        },
        labelStyle: "font-weight:bold"
    }],
    listeners:{
        beforeselect: function (sel, record) {
            var is_editable = record.get('is_editable');
            if (!is_editable) {
                return false;
            }
        }
    },
    bbar: [
        {
            xtype: 'pagingtoolbar',
            //width: '100%',
            displayInfo: false,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var store = this.store,
                    grid = this.up('grid'),
                    panel = grid.up('premisealterationcomparedetails'),
                    form_id = grid.down('hiddenfield[name=form_id]').getValue(),
                    module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                    application_id = panel.down('hiddenfield[name=application_id]').getValue(),
                    application_code = panel.down('hiddenfield[name=application_code]').getValue();
                store.getProxy().extraParams = {
                    module_id: module_id,
                    application_id: application_id,
                    application_code: application_code,
                    form_id: form_id
                };
            }
        },
        '->',
        {
            xtype: 'button',
            text: 'Sync Changes',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            name: 'effect_changes',
            disabled: true,
            hidden: true
        }
    ]
});