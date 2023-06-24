/**
 * Created by Softclans on 9/28/2018.
 */
Ext.define('Admin.view.commoninterfaces.forms.QueryChecklistItemsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'querychecklistitemsfrm',
    autoScroll: true,
    controller: 'commoninterfacesVctr',
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_checklist_items',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'unset_data',
        value: 'checklist_category_id,module_id,sub_module_id,section_id,application_code,process_id,query_id,is_structured',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    },{
        xtype:'hiddenfield',
        name:'module_id'
    } ,{
        xtype:'hiddenfield',
        name:'sub_module_id'
    },{
        xtype:'hiddenfield',
        name:'section_id'
    },{
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype:'hiddenfield',
        name:'application_code'
    },{
        xtype:'hiddenfield',
        name:'query_id'
    },{
        xtype:'hiddenfield',
        name:'process_id'
    },{
        xtype:'hiddenfield',
        name:'is_structured'
    },{
        xtype: 'combo',
        fieldLabel: 'Checklist Type',
        margin: '0 20 20 0',
        name: 'checklist_type_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getUnstructuredQueryChecklistTypes',
                        extraParams: {
                            table_name: 'par_checklist_types'
                        }
                    }
                },
                isLoad: false
            },
            afterrender: function () {
                var form = this.up('form'),
                    store = this.getStore(),
                    module_id = form.down('hiddenfield[name=module_id]').getValue(),
                    sub_module_id = form.down('hiddenfield[name=sub_module_id]').getValue(),
                    section_id = form.down('hiddenfield[name=section_id]').getValue(),
                    filterObj = {module_id: module_id, sub_module_id: sub_module_id,section_id:section_id},
                    filterStr = JSON.stringify(filterObj);
                store.removeAll();
                store.load({params: {filters: filterStr}});
            }
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'par_checklist_items',
                    storeID: 'checklist_itemsstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doSavequerychecklistitemsWin'
                }
            ]
        }
    ]
});