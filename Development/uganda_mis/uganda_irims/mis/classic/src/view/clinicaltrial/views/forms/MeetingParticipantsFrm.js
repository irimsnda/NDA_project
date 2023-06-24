/**
 * Created by Kip on 1/25/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.MeetingParticipantsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'meetingparticipantsfrm',
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
            value: 'tc_meeting_participants'
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'participant_name',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    disabled: true,
                    columnWidth: 0.1,
                    tooltip: 'Search Participant',
                    action: 'search_participant',
                    childXtype: 'premiseselectiongrid',
                    winTitle: 'Premises Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0'
                }
            ]
        },
        {
            xtype: 'textfield',
            name: 'phone',
            fieldLabel: 'Phone No',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
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
            table_name:'tc_meeting_participants',
            storeID:'tcmeetingparticipantsstr',
        }
    ]
});