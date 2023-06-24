/**
 * Created by Kip on 1/25/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.TcMeetingAgendasFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'tcmeetingagendasfrm',
    controller: 'clinicaltrialvctr',
    bodyPadding: 5,
    frame: true,
    layout: 'column',
    defaults:{
        margin: 3,
        labelAlign: 'top',
        columnWidth: 1,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'meeting_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tc_meeting_agendas'
        },
        
        {
            xtype: 'textfield',
            name: 'agenda',
            fieldLabel: 'Agenda'
        },
        {
            xtype: 'textarea',
            name: 'description',
            fieldLabel: 'Description',
            allowBlank: true
        }
    ],
    buttons:[
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            formBind: true,
            handler: 'doCreateClinicalTrialParamWin',
            action_url:'clinicaltrial/saveClinicalTrialCommonData',
            table_name:'tc_meeting_agendas',
            storeID:'tcmeetingagendassstr',
        }
    ]
});