/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.forms.Repositoryrootfolderfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'repositoryrootfolderfrm',
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
        value: 'tra_repositoryroot_defination',
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
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name'
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Code',
        margin: '0 20 20 0',
        name: 'code',
        allowBlank: true
    }],
    dockedItems:[{
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_repositoryroot_defination',
                    storeID: 'repositoryrootfolderStr',
                    formBind: true,
                    ui: 'soft-purple',
					action_url: 'documentmanagement/saveDocumentRepositoryRootFolder',
                    handler: 'funcSaveDocumentRepositoryStructure'
                },{
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