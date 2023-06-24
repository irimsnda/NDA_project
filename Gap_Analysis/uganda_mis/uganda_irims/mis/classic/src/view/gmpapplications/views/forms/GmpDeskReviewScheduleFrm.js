/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.GmpDeskReviewScheduleFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gmpdeskreviewschedulefrm',
    layout: 'column',
    scrollable: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 3,
        labelAlign: 'top'
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
            name: 'inspectionteam_name',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Team Description',
            name: 'inspectionteam_desc'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Start Date',
            name: 'start_date',
            allowBlank: false,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            minValue: new Date(),
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'End Date',
            name: 'end_date',
            allowBlank: false,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            minValue: new Date(),
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        }
    ]
});