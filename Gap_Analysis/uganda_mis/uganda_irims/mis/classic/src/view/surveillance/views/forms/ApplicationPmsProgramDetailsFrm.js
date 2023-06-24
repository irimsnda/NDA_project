/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.ApplicationPmsProgramDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationpmsprogramdetailsfrm',
    layout: 'column',
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'PMS Program',
            style: 'background:white',
            collapsible: true,
            checkboxToggle:true,
            layout: 'column',
            defaults: {
                columnWidth: 0.33,
                margin: 2,
                labelAlign: 'top',
                allowBlank: false
            },
            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'pms_program_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name/Identity',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'name',
                            readOnly: true,
                            columnWidth: 0.9
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            action: 'link_pms_program',
                            childXtype: 'pmsprogramsselectiongrid',
                            winTitle: 'PMS Program Selection List',
                            winWidth: '80%'
                        }
                    ]
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Start Date',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    format: 'd/m/Y',
                    name: 'start_date',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'End Date',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    format: 'd/m/Y',
                    name: 'end_date',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                }
            ]
        }
    ]
});