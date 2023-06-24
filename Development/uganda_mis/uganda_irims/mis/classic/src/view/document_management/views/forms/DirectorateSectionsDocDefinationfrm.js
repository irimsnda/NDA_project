/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.forms.DirectorateSectionsDocDefinationfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'directorateSectionsDocDefinationfrm',
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
        value: 'tra_sections_docdefination',
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
    }, {
        xtype: 'combo',
        fieldLabel: 'DMS Site',
        margin: '0 20 20 0',
        name: 'dms_site_id',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    storeId: 'dmssitedefinationstr',
                    proxy: {
                        url: 'documentmanagement/getDMSSiteDefinationDetails'
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Section Name',
        margin: '0 20 20 0',
        name: 'section_id',
        valueField: 'id',
        displayField: 'name',
        store: 'sectionsstr',
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
                table_name: 'tra_dmsdocument_sites',
                storeID: 'dmssectionsdefinationstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'documentmanagement/saveDMSSectionDefinationDetails',
                handler: 'doCreateConfigParamWin'
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