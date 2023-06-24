/**
 * Created by Kip on 11/8/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PersonnelDocUploadsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'personneldocuploadsfrm',
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
            name: 'personnel_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Name/Type',
            name: 'name',
            allowBlank: true
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
            formBind: true,
            table_name: 'tra_personnel_docs',
            storeID: 'premisepersonneldocsstr',
            action_url: 'premiseregistration/uploadPersonnelDocument',
            handler: 'doCreatePremiseRegParamWin'
        }
    ]
});