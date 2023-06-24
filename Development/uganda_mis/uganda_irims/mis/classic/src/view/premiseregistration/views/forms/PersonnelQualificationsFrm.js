/**
 * Created by Kip on 11/8/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PersonnelQualificationsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'personnelqualificationsfrm',
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
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_personnel_qualifications'
        },
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
            name: 'registration_no',
            fieldLabel: 'Registration No'
        },
       {
            xtype: 'combo',
            name: 'study_field_id',
            fieldLabel: 'Field of Study',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            store: 'studyfieldsstr',
            listeners:{
                afterrender: function(){
                    var store=this.getStore();
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'combo',
            name: 'qualification_id',
            fieldLabel: 'Qualification',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            store: 'personnelqualificationsstr',
            listeners:{
                afterrender: function(){
                    var store=this.getStore();
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'textfield',
            name: 'institution',
            fieldLabel: 'Institution'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_personnel_qualifications',
            storeID: 'trapersonnelqualificationsstr',
            action_url: 'premiseregistration/savePremisePersonnelQualifications',
            handler: 'doCreatePremiseRegParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});