/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrGcpInspectionScheduleDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrgcpinspectionscheduledetailsfrm',
    controller: 'clinicaltrialvctr',
    height: Ext.Element.getViewportHeight() - 150,
    collasible: true,
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 2,
    defaults: {
        margin: 2,
        allowBlank: false,
        labelStyle: "font-weight:bold;font-size:12px",
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.query('.button').forEach(function (c) {
                    c.setHidden(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'datefield',
            name: 'start_date',
            fieldLabel: 'Expected Start Date',
            columnWidth: 0.33,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
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
            name: 'end_date',
            fieldLabel: 'Expected End Date',
            columnWidth: 0.33,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'combo',
            name: 'inspection_type_id',
            fieldLabel: 'Inspection Type',
            columnWidth: 0.33,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_inspection_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textarea',
            name: 'description',
            fieldLabel: 'Description',
            columnWidth: 0.99,
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'unset_data',
            value: 'isReadOnly'
        },
    ],
   dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save Details',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    formBind: true,
                   
                    name: 'save_btn'
                }
            ]
        }
    ]
});