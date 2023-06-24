/**
 * Created by Kip on 10/4/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.AppDocUploadsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'appdocuploadsfrm',
    controller: 'premiseregistrationvctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'filefield',
            fieldLabel: 'File/Document',
            name: 'uploaded_doc'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description',
            allowBlank: true
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Upload',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-upload',
            name:'upload_file_btn',
            formBind: true
        }
    ]
});