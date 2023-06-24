/**
 * Created by Kip on 6/27/2019.
 */
Ext.define('Admin.view.usermanagement.views.forms.SignatureUploadFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'signatureuploadfrm',
    controller: 'usermanagementvctr',
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
            name: 'user_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'filefield',
            fieldLabel: 'Signature File',
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
            name:'upload_sign_btn',
            formBind: true
        }
    ]
});