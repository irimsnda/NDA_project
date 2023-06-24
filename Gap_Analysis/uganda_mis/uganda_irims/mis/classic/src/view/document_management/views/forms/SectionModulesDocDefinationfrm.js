/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.forms.SectionModulesDocDefinationfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'sectionModulesDocDefinationfrm',
    controller: 'documentsManagementvctr',
    autoScroll: true,
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
        value: 'tra_sectionsmodule_docdefination',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'doc_section_id',
        allowBlank: true
    },  {
        xtype: 'combo',
        fieldLabel: 'Module Name',
        margin: '0 20 20 0',
        name: 'module_id',
        valueField: 'id',
        displayField: 'name',
        store: 'system_modulesStr',
        queryMode: 'local',
        listeners: {
            beforerender: function(cbo){
                  cbo.store.load();
            }
        }
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_sectionsmodule_docdefination',
                storeID: 'dmssectionsModuledefinationstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'documentmanagement/saveDMSSecModulesDefinationDetails',
                handler: 'doCreateDMSSectionDocConfigParamWin'
            }, {
                text: 'Reset',
                iconCls: 'x-fa fa-close',
                ui: 'soft-purple',
                handler: function (btn) {
                    btn.up('form').getForm().reset();
                }
            }
        ]
    }
    ]
});