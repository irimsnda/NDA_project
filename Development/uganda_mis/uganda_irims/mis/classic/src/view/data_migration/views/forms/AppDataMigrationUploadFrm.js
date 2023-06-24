/**
 * Created by Softclans on 9/16/2018.
 */
Ext.define('Admin.view.data_migration.views.forms.AppDataMigrationUploadFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'appdatamigrationuploadfrm',
    autoScroll: true,
    controller: 'applicationdatmigrationvctr',
    layout: 'form',
    bodyPadding: 8,
    frame: true,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
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
        name: 'migration_request_id',
        allowBlank: false
    }, {
        xtype: 'hiddenfield',
        name: 'module_id',
        allowBlank: false
    },{
        xtype: 'hiddenfield',
        name: 'sub_module_id',
        allowBlank: false
    },{
        xtype: 'filefield',
        fieldLabel: 'File/Document',
        allowBlank: false,
        name: 'uploaded_doc'
    },{
        xtype: 'textarea',
        fieldLabel: 'Remarks',
        margin: '0 20 20 0',
        name: 'remarks',
        allowBlank: true
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->',{
                    text: 'Upload Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_datamigrationrequests',
                   // storeID: 'productappdatamigrationrequestgridstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'migrationscripts/saveappdatamigrationuploads',
                    handler: 'doSaveappdatamigrationrequest'
                }
            ]
        }
    ]
});