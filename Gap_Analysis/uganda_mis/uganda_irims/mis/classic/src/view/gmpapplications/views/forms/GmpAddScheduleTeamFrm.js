/**
 * Created by Kip on 1/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.GmpAddScheduleTeamFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gmpaddscheduleteamfrm',
    layout: 'column',
    scrollable: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        margin: 3
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Team Name',
            columnWidth: 0.5,
            name: 'inspectionteam_name',
            allowBlank: false
        },
        
        {
            xtype: 'datefield',
            fieldLabel: 'Start Date',
            name: 'start_date',
            allowBlank: false,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            enableKeyEvents: true,
            listeners: {
                change: function (field,newVal,oldVal) {
                    var form=field.up('form'),
                        end_date=form.down('datefield[name=end_date]');
                    end_date.setMinValue(newVal);
                }
            }
        },
        {
            xtype: 'datefield',
            fieldLabel: 'End Date',
            name: 'end_date',
            allowBlank: false,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'textfield',
            fieldLabel: 'Team Description', columnWidth: 0.5,
            name: 'inspectionteam_desc'
        },{
            xtype: 'textarea',
            fieldLabel: 'Inspection Country List', columnWidth: 0.5,
            name: 'inspectioncountry_list',
            allowBlank: false
        },
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            height: 40,
            items: [
                {
                    text: 'Back',
                    iconCls: 'x-fa fa-backward',
                    ui: 'soft-purple',
                    
                    handler: function (btn) {
                        var form = btn.up('form'),
                             win = form.up('window');
                             win.down(); 
                    }
                },
                '->',
                {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    formBind: true,
                    handler: 'saveWinInspectionTeamDetails',
                    action_url: 'gmpapplications/saveGmpApplicationCommonData',
                    table_name: 'inspectionteam_details'
                }
            ]
        }
    ]
});