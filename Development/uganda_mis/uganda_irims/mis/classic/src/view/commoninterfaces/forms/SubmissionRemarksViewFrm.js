/**
 * Created by softclans
 */
Ext.define('Admin.view.commoninterfaces.forms.SubmissionRemarksViewFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'submissionRemarksViewFrm',
    controller: 'commoninterfacesVctr',
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
            xtype: 'textfield',
            name: 'remark_by',
            fieldLabel: 'Remarks By',
            readOnly: true
        },{
            xtype: 'datefield',
            name: 'remark_on',
            fieldLabel: 'Remarks On',
            format: 'Y-m-d',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            readOnly: true
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Remarks',
            name: 'remark',
            readOnly: true
        }
    ]
});